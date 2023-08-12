/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import "./JDInformation.css";
import { useRef } from "react";
import { PAGE_URL } from "../../constants/configs";
import { useNavigate } from "react-router-dom";
import WrapperContainer from "components/WrapperContainer";
import { useAppDispatch } from "store/hooks";
import { createJD, createTextFromParagraph } from "./jdInformationSlice";

export const JDInformation = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const mainDescRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (titleRef.current && mainDescRef.current) {
            try {
                // Add jd to db
                const jdResponse: any = await dispatch(
                    createJD({ title: titleRef.current.value })
                ).unwrap();
                const textParams = {
                    text: mainDescRef.current.value,
                    parent_id: jdResponse.id
                };

                await dispatch(createTextFromParagraph(textParams));

                navigate(PAGE_URL.JOB_LIST);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="jdinformation">
            <WrapperContainer bodyContent>
                <div className="flex flex-col items-center">
                    <div className="jdinformation__header">
                        <a href="/">
                            <h3 className="jdinformation__header__title">Upload your JD</h3>
                        </a>
                    </div>
                    <div className="jdinformation__body">
                        <form>
                            <div className="jdinformation__body__title--top">
                                Title and JD Information
                            </div>
                            <div className="jdinformation__body__row">
                                <div className="jdinformation__body__field-block">
                                    <label
                                        htmlFor="fullname"
                                        className="jdinformation__body__label undefined"
                                    >
                                        Job Title
                                    </label>
                                    <div className="jdinformation__body__input-container">
                                        <input
                                            ref={titleRef}
                                            type="text"
                                            name="title"
                                            required
                                            className="jdinformation__body__input-box"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="jdinformation__body__field-block">
                                <label
                                    htmlFor="desc"
                                    className="jdinformation__body__label undefined"
                                >
                                    Description
                                </label>
                                <div className="jdinformation__body__input-container">
                                    <textarea
                                        rows={10}
                                        ref={mainDescRef}
                                        name="desc"
                                        required
                                        className="jdinformation__body__input-box"
                                    />
                                </div>
                            </div>
                            <div className="jdinformation__bottom">
                                <button
                                    className="jdinformation__bottom__button-submit"
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
