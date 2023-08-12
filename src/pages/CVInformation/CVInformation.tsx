/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import "./CVInformation.css";
import { useState, useRef, ChangeEvent } from "react";
import { AddedInformation } from "../../types/addedInformation";
import APP, { PAGE_URL } from "../../constants/configs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authSelector } from "store/selectors";
import WrapperContainer from "components/WrapperContainer";
import { createCV } from "./cvInformationSlice";
import { CVParams, IS3Params } from "pages/interface";
import { uploadFileToS3 } from "pages/Studio/studioSlice";

export const CVInformation = () => {
    const [file, setFile] = useState<File | null>();
    const [values, setValues] = useState<Array<AddedInformation>>([]);
    const [isAdding, setIsAdding] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const mainDescRef = useRef<HTMLTextAreaElement>(null);
    const { userInfo } = useAppSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (File && e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleAddInput = () => {
        if (isAdding && titleRef.current && descRef.current) {
            const newValue: AddedInformation = {
                title: titleRef.current.value,
                url: urlRef.current ? urlRef.current.value : "",
                desc: descRef.current.value
            };
            setValues([...values, newValue]);
        }
        setIsAdding(!isAdding);
    };

    const handleDeleteAddedInfor = (ind: number) => {
        const tmp = values.filter((value, index) => index != ind);
        setValues(tmp);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (
            File &&
            fullNameRef.current &&
            emailRef.current &&
            phoneNumberRef.current &&
            mainDescRef.current
        ) {
            const userId = userInfo?.id;
            const data = new FormData();
            data.append("file", file as Blob);
            try {
                // Add cv to db
                const cvParams: CVParams = {
                    user_id: userId || "",
                    full_name: fullNameRef.current?.value,
                    email: emailRef.current?.value,
                    phone_number: phoneNumberRef.current.value,
                    description: mainDescRef.current.value,
                    bucket_name: APP.BUCKET_S3,
                    path: "server-test-01"
                };
                const res: any = await dispatch(
                    createCV({ params: cvParams, file: data })
                ).unwrap();
                const cvID = res.id;

                // Add cv to s3
                const s3Params: IS3Params = {
                    bucket_name: APP.BUCKET_S3,
                    path: "server-test-01",
                    type: "application",
                    file_id: cvID,
                    user_id: userId || ""
                };
                await dispatch(uploadFileToS3({ params: s3Params, file: data })).unwrap();

                navigate(PAGE_URL.JOB_LIST);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="cvinformation">
            <WrapperContainer bodyContent>
                <div className="flex flex-col items-center">
                    <div className="cvinformation__header">
                        <a href="/">
                            <h3 className="cvinformation__header__title">
                                Upload your information
                            </h3>
                        </a>
                    </div>
                    <div className="cvinformation__body">
                        <form>
                            <div className="cvinformation__body__title--top">
                                Fundamental information
                            </div>
                            <div className="cvinformation__body__row">
                                <div className="cvinformation__body__field-block">
                                    <label
                                        htmlFor="fullname"
                                        className="cvinformation__body__label undefined"
                                    >
                                        Fullname
                                    </label>
                                    <div className="cvinformation__body__input-container">
                                        <input
                                            ref={fullNameRef}
                                            type="text"
                                            name="fullname"
                                            required
                                            className="cvinformation__body__input-box"
                                        />
                                    </div>
                                </div>
                                <div className="cvinformation__body__field-block">
                                    <label
                                        htmlFor="email"
                                        className="cvinformation__body__label undefined"
                                    >
                                        Email
                                    </label>
                                    <div className="cvinformation__body__input-container">
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            name="email"
                                            required
                                            className="cvinformation__body__input-box"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="cvinformation__body__row">
                                <div className="cvinformation__body__field-block">
                                    <label
                                        htmlFor="phone"
                                        className="cvinformation__body__label undefined"
                                    >
                                        Phone number
                                    </label>
                                    <div className="cvinformation__body__input-container">
                                        <input
                                            ref={phoneNumberRef}
                                            type="tel"
                                            name="phone"
                                            required
                                            className="cvinformation__body__input-box"
                                        />
                                    </div>
                                </div>
                                <div className="cvinformation__body__field-block">
                                    <label
                                        htmlFor="cv"
                                        className="cvinformation__body__label undefined"
                                    >
                                        Your CV
                                    </label>
                                    <div className="cvinformation__body__input-container">
                                        <input
                                            onChange={handleFile}
                                            type="file"
                                            name="cv"
                                            accept="application/pdf"
                                            required
                                            className="cvinformation__body__upload-box"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="cvinformation__body__field-block">
                                <label
                                    htmlFor="desc"
                                    className="cvinformation__body__label undefined"
                                >
                                    Description
                                </label>
                                <div className="cvinformation__body__input-container">
                                    <textarea
                                        rows={10}
                                        ref={mainDescRef}
                                        name="desc"
                                        placeholder="Tell us about yourself..."
                                        required
                                        className="cvinformation__body__input-box"
                                    />
                                </div>
                            </div>
                            <div className="cvinformation__body__title">Optional information</div>
                            {values.map((value, index) => (
                                <div key={index} className="cvinformation__body__add-item">
                                    <button
                                        className="cvinformation__add-item__button"
                                        onClick={() => handleDeleteAddedInfor(index)}
                                    >
                                        Remove
                                    </button>
                                    <div className="cvinformation__body__row">
                                        <div className="cvinformation__body__field-block">
                                            <label
                                                htmlFor="title"
                                                className="cvinformation__body__label undefined"
                                            >
                                                Title
                                            </label>
                                            <div className="cvinformation__body__input-container">
                                                <input
                                                    type="text"
                                                    name="fullname"
                                                    required
                                                    placeholder={value?.title}
                                                    className="cvinformation__body__input-box--added"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className="cvinformation__body__field-block">
                                            <label
                                                htmlFor="link"
                                                className="cvinformation__body__label undefined"
                                            >
                                                Url
                                            </label>
                                            <div className="cvinformation__body__input-container">
                                                <input
                                                    name="link"
                                                    placeholder={value?.url}
                                                    className="cvinformation__body__input-box--added"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cvinformation__body__field-block">
                                        <label
                                            htmlFor="desc"
                                            className="cvinformation__body__label undefined"
                                        >
                                            Description
                                        </label>
                                        <div className="cvinformation__body__input-container">
                                            <textarea
                                                rows={3}
                                                name="desc"
                                                placeholder={value?.desc}
                                                required
                                                className="cvinformation__body__input-box--added"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isAdding && (
                                <div className="cvinformation__add-box">
                                    <button
                                        className="cvinformation__add-item__button"
                                        onClick={() => setIsAdding(false)}
                                    >
                                        Undo
                                    </button>
                                    <div className="cvinformation__body__row">
                                        <div className="cvinformation__body__field-block">
                                            <label
                                                htmlFor="title"
                                                className="cvinformation__body__label undefined"
                                            >
                                                Title
                                            </label>
                                            <div className="cvinformation__body__input-container">
                                                <input
                                                    ref={titleRef}
                                                    type="text"
                                                    name="fullname"
                                                    required
                                                    className="cvinformation__body__input-box"
                                                />
                                            </div>
                                        </div>
                                        <div className="cvinformation__body__field-block">
                                            <label
                                                htmlFor="link"
                                                className="cvinformation__body__label undefined"
                                            >
                                                Url
                                            </label>
                                            <div className="cvinformation__body__input-container">
                                                <input
                                                    ref={urlRef}
                                                    name="link"
                                                    placeholder="Link to your information..."
                                                    className="cvinformation__body__input-box"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cvinformation__body__field-block">
                                        <label
                                            htmlFor="desc"
                                            className="cvinformation__body__label undefined"
                                        >
                                            Description
                                        </label>
                                        <div className="cvinformation__body__input-container">
                                            <textarea
                                                ref={descRef}
                                                rows={3}
                                                name="desc"
                                                placeholder="Tell us more about your information..."
                                                required
                                                className="cvinformation__body__input-box"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="">
                                <button
                                    className="cvinformation__body__button-add"
                                    onClick={handleAddInput}
                                >
                                    {!isAdding ? "+ Add" : "Save"}
                                </button>
                            </div>
                            <div className="cvinformation__bottom">
                                <button
                                    className="cvinformation__bottom__button-submit"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </WrapperContainer>
        </div>
    );
};
