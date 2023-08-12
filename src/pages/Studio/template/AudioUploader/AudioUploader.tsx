import { useState, useRef, useEffect, ChangeEvent } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./AudioUploader.css";
import { AudioUpload } from "assets";
import { IStudioForm } from "pages/interface";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import { NullableBlob, NullableFile, NullableString } from "types/generatedAvatar";

interface Props {
    register: UseFormRegister<IStudioForm>;
    setValue: UseFormSetValue<IStudioForm>;
    file?: NullableFile;
    uploadedAudioUrl: NullableBlob;
    setUploadedAudioUrl: React.Dispatch<React.SetStateAction<NullableBlob>>;
    setUploadedAudioId: React.Dispatch<React.SetStateAction<NullableString>>;
}

export const AudioUploader = (props: Props) => {
    const { register, file, setValue, setUploadedAudioUrl, uploadedAudioUrl, setUploadedAudioId } =
        props;
    const audioRef = useRef(new Audio());
    const [disabled, setDisabled] = useState(true);
    const handleEnableInput = () => {
        setDisabled(!disabled);
    };
    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setValue("audio", files[0]);
            setValue("audioName", files[0].name);
            setUploadedAudioUrl(null);
            setUploadedAudioId(null);
        }
    };

    useEffect(() => {
        if (file) {
            audioRef.current = new Audio(window.URL.createObjectURL(file));
        }
    }, [file]);

    const isFileNotEmpty = file || uploadedAudioUrl;

    return (
        <div className="audioUploader">
            <div className="audioUploader__container__left">
                <div className="audioUploader__left__box">
                    <div className="audioUploader__box__form">
                        <div className="audioUploader__form__title">
                            <span className="audioUploader__title__head">Upload your audio</span>
                            <p className="audioUploader__title__desc">
                                Audio File should be the voice you want to use within generated
                                avatar. Please provide a clear sound for better version of
                                generation
                            </p>
                        </div>
                        <div className="audioUploader__menu">
                            <label htmlFor="audio" className="audioUploader__menu__item">
                                <span className="">Audio</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="audio"
                                    accept="audio/*"
                                    onChange={handleFile}
                                />
                                <AudioUpload />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="audioUploader__container__right">
                <div className="audioUploader__right__controllers">
                    {isFileNotEmpty && (
                        <button
                            type="button"
                            className="audioUploader__right__change"
                            onClick={handleEnableInput}
                        >
                            {disabled ? "Edit" : "Save"}
                        </button>
                    )}
                    <input
                        className="audioUploader__right__filename"
                        placeholder={file?.name}
                        disabled={disabled}
                        {...register("audioName")}
                    />
                </div>
                <div className="audioUploader__right__file">
                    {isFileNotEmpty ? (
                        <ReactAudioPlayer
                            src={window.URL.createObjectURL(
                                file ? file : new Blob([uploadedAudioUrl as Blob])
                            )}
                            className=""
                            controls
                        />
                    ) : (
                        <ReactAudioPlayer className="" controls />
                    )}
                </div>
            </div>
        </div>
    );
};
