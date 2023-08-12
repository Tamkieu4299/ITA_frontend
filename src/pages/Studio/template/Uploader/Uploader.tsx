/* eslint-disable camelcase */
import { useState, useRef, ChangeEvent } from "react";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import "./Uploader.css";
import { ImageUpload, VideoUpload } from "assets";
import { IStudioForm } from "pages/interface";
import { NullableBlob, NullableFile, NullableString } from "types/generatedAvatar";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<IStudioForm>;
    setValue: UseFormSetValue<IStudioForm>;
    file?: NullableFile;
    setFileType: React.Dispatch<React.SetStateAction<string>>;
    fileType: string;
    uploadedFileUrl: NullableBlob;
    setUploadedFileUrl: React.Dispatch<React.SetStateAction<NullableBlob>>;
    setUploadedFileId: React.Dispatch<React.SetStateAction<NullableString>>;
}

export const Uploader = (props: Props) => {
    const {
        register,
        file,
        setValue,
        setFileType,
        fileType,
        uploadedFileUrl,
        setUploadedFileUrl,
        setUploadedFileId
    } = props;
    const video = useRef<HTMLVideoElement>(null);
    const [disabled, setDisabled] = useState(true);

    const handleEnableInput = () => {
        setDisabled(!disabled);
    };

    const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setValue("file", files[0]);
            setValue("fileName", files[0].name);
            setFileType(e.target.id);
            setUploadedFileUrl(null);
            setUploadedFileId(null);
        }
    };

    const isFileNotEmpty = file || uploadedFileUrl;

    return (
        <div className="uploader">
            <div className="uploader__container__left">
                <div className="uploader__left__box">
                    <div className="uploader__box__form">
                        <div className="uploader__menu">
                            <label htmlFor="video" className="uploader__menu__item">
                                <span className="">Video</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="video"
                                    accept="video/*"
                                    onChange={handleFile}
                                />
                                <VideoUpload />
                            </label>
                            <label htmlFor="image" className="uploader__menu__item">
                                <span className="">Image</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleFile}
                                />
                                <ImageUpload />
                            </label>
                        </div>
                        <div className="uploader__right__controllers">
                            {isFileNotEmpty ? (
                                <>
                                    <input
                                        className="uploader__right__filename"
                                        placeholder={file?.name}
                                        disabled={disabled}
                                        {...register("fileName")}
                                    />
                                    <button
                                        type="button"
                                        className="uploader__right__change"
                                        onClick={handleEnableInput}
                                    >
                                        {disabled ? "Edit" : "Save"}
                                    </button>
                                </>
                            ) : (
                                <div className="uploader__form__title">
                                    <span className="uploader__title__head">
                                        Upload your video or image
                                    </span>
                                    <p className="uploader__title__desc">
                                        File should be video or photo of your face
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isFileNotEmpty && (
                <div className="uploader__container__right">
                    <div className="uploader__right__file">
                        {isFileNotEmpty ? (
                            fileType === "video" ? (
                                <Player
                                    src={window.URL.createObjectURL(
                                        file ? file : new Blob([uploadedFileUrl as Blob])
                                    )}
                                />
                            ) : (
                                <img
                                    src={window.URL.createObjectURL(
                                        file ? file : new Blob([uploadedFileUrl as Blob])
                                    )}
                                    className="file__object"
                                />
                            )
                        ) : (
                            <video ref={video} className="file__object--none"></video>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
