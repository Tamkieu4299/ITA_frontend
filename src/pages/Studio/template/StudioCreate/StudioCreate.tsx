/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { useForm, SubmitHandler } from "react-hook-form";
import { GeneratedAvatar, NullableBlob, NullableString } from "types/generatedAvatar";
import React, { useState, useEffect } from "react";
import { Uploader } from "../Uploader/Uploader";
import { Recorder } from "../Recorder/Recorder";
import { AudioUploader } from "../AudioUploader/AudioUploader";
import APP, { PAGE_URL } from "constants/configs";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authSelector, studioSelector } from "store/selectors";
import {
    changeTab,
    createAudio,
    createAvatarGeneration,
    createImage,
    createVideo,
    getAudioById,
    getBinaryFile,
    getGenerationById,
    getImageById,
    getVideoById,
    sendGenerationTalkingHead,
    uploadFileToS3
} from "../../studioSlice";
import { IS3BinaryParams, IS3Params, IStudioForm, IVideoParams } from "pages/interface";
import { useNavigate, useParams } from "react-router-dom";

const defaultValues: IStudioForm = {
    audio: null,
    recorder: null,
    file: null,
    audioName: "",
    fileName: ""
};

const StudioCreate = () => {
    const { generationId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { activeTabIndex } = useAppSelector(studioSelector);
    const [fileType, setFileType] = useState<string>("video");
    const [uploadedFileUrl, setUploadedFileUrl] = useState<NullableBlob>(null);
    const [uploadedAudioUrl, setUploadedAudioUrl] = useState<NullableBlob>(null);
    const [uploadedFileId, setUploadedFileId] = useState<NullableString>(null);
    const [uploadedAudioId, setUploadedAudioId] = useState<NullableString>(null);
    const { handleSubmit, setValue, register, watch } = useForm<IStudioForm>({ defaultValues });
    const watchAllFields = watch();
    const { userInfo } = useAppSelector(authSelector);

    const handleTabChange = (idx: number) => {
        dispatch(changeTab(idx));
    };

    const handleGenerateAvatar: SubmitHandler<IStudioForm> = async (data) => {
        try {
            const { audio, recorder, file, audioName, fileName } = data;
            const userId = userInfo?.id || "";
            let videoKey = "",
                audioKey = "",
                imageKey = "",
                video_id = "",
                audio_id = "",
                image_id = "";

            if (uploadedFileId) {
                if (fileType === "video") {
                    video_id = uploadedFileId;
                    videoKey = `server-test-01/video/${userId}/${uploadedFileId}.mp4`;
                } else {
                    image_id = uploadedFileId;
                    imageKey = `server-test-01/image/${userId}/${uploadedFileId}.jpg`;
                }
            }

            if (uploadedAudioId) {
                audio_id = uploadedAudioId;
                audioKey = `server-test-01/audio/${userId}/${uploadedFileId}.wav`;
            }

            // Video / image uploader
            const fileData = new FormData();
            fileData.append("file", file as Blob);
            fileData.append("filename", fileName);

            if (file) {
                if (fileType === "video") {
                    try {
                        // Add video to db and backend static file
                        const videoParams: IVideoParams = {
                            file_name: fileName,
                            user_id: userId,
                            language: "en",
                            duration: 1000
                        };
                        const res: any = await dispatch(
                            createVideo({ file: fileData, params: videoParams })
                        ).unwrap();

                        if (res) {
                            const { id } = res;
                            video_id = id;

                            // Add video to s3
                            const s3Params: IS3Params = {
                                bucket_name: APP.BUCKET_S3,
                                path: "server-test-01",
                                type: "video",
                                file_id: id,
                                user_id: userId
                            };

                            await dispatch(uploadFileToS3({ file: fileData, params: s3Params }));

                            videoKey = `server-test-01/video/${userId}/${id}.mp4`;
                        }
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    try {
                        // Add image to db and backend static file
                        const imageParams = {
                            file_name: fileName,
                            user_id: userId
                        };
                        const res: any = await dispatch(
                            createImage({ file: fileData, params: imageParams })
                        ).unwrap();

                        if (res) {
                            const { id } = res;
                            image_id = id;

                            // Add image to s3
                            const s3Params: IS3Params = {
                                bucket_name: APP.BUCKET_S3,
                                path: "server-test-01",
                                type: "image",
                                file_id: id,
                                user_id: userId
                            };

                            await dispatch(uploadFileToS3({ file: fileData, params: s3Params }));

                            imageKey = `server-test-01/image/${userId}/${id}.jpg`;
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            } else {
                // Record uploader
                const recordData = new FormData();
                const mp4File = new File([recorder as Blob], "recording.mp4", {
                    type: "video/mp4"
                });
                recordData.append("file", mp4File);
                recordData.append("filename", mp4File.name);

                try {
                    // Add video to db and backend static file
                    const videoParams = {
                        user_id: userId,
                        file_name: fileName,
                        language: "en",
                        duration: 1000
                    };
                    const res: any = await dispatch(
                        createVideo({ file: recordData, params: videoParams })
                    ).unwrap();

                    if (res) {
                        const { id } = res;
                        video_id = id;

                        // Add video to s3
                        const s3Params: IS3Params = {
                            bucket_name: APP.BUCKET_S3,
                            path: "server-test-01",
                            type: "video",
                            file_id: id,
                            user_id: userId
                        };

                        await dispatch(uploadFileToS3({ file: recordData, params: s3Params }));

                        videoKey = `server-test-01/video/${userId}/${id}.mp4`;
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            // Upload audio

            if (audio) {
                const audioData = new FormData();
                audioData.append("file", audio as Blob);
                audioData.append("filename", audioName);

                try {
                    // Add audio to db and backend static file
                    const audioParams = {
                        user_id: userId,
                        file_name: audioName,
                        language: "en",
                        duration: 1000
                    };
                    const res: any = await dispatch(
                        createAudio({ file: audioData, params: audioParams })
                    ).unwrap();

                    if (res) {
                        const { id } = res;
                        audio_id = id;

                        // Add audio to s3
                        const s3Params: IS3Params = {
                            bucket_name: APP.BUCKET_S3,
                            path: "server-test-01",
                            type: "audio",
                            file_id: id,
                            user_id: userId
                        };

                        await dispatch(uploadFileToS3({ file: audioData, params: s3Params }));
                        audioKey = `server-test-01/audio/${userId}/${id}.wav`;
                    }
                } catch (err) {
                    console.log(err);
                }
            }

            // Generate task
            console.log(
                `Send to ML: video_key: ${videoKey} audio_key: ${audioKey} image_key: ${imageKey}`
            );

            const generationParams: Omit<GeneratedAvatar, "id"> = {
                audio_id,
                video_id,
                image_id,
                user_id: userId,
                bucket_s3: "",
                path_s3: "",
                type: "generated"
            };
            const res: any = await dispatch(createAvatarGeneration(generationParams)).unwrap();

            // Send to ML proxy
            const sendMLParams = {
                bucket_name: APP.BUCKET_S3,
                task_id: res.id,
                video_key: videoKey,
                image_key: imageKey,
                audio_key: audioKey,
                text: ""
            };
            await dispatch(sendGenerationTalkingHead(sendMLParams)).unwrap();
            navigate(PAGE_URL.STUDIO_PREVIEW);
        } catch (error) {
            console.log(error);
        }
    };

    const tabsData = [
        {
            label: "Record",
            content: <Recorder setValue={setValue} videoBlob={watchAllFields["recorder"]} />
        },
        {
            label: "Upload",
            content: (
                <Uploader
                    register={register}
                    setValue={setValue}
                    file={watchAllFields["file"]}
                    setFileType={setFileType}
                    fileType={fileType}
                    uploadedFileUrl={uploadedFileUrl}
                    setUploadedFileUrl={setUploadedFileUrl}
                    setUploadedFileId={setUploadedFileId}
                />
            )
        }
    ];

    useEffect(() => {
        if (generationId) {
            try {
                const fetchData = async () => {
                    const res: any = await dispatch(getGenerationById(generationId)).unwrap();
                    const { audio_id, video_id, image_id } = res;
                    if (image_id) {
                        const imageParams: IS3BinaryParams = {
                            bucket_name: APP.BUCKET_S3,
                            type: "image",
                            path: `server-test-01/image/${userInfo?.id}/${image_id}.jpg`
                        };
                        const imageBlob: any = await dispatch(getBinaryFile(imageParams)).unwrap();
                        const imageDetail: any = await dispatch(getImageById(image_id)).unwrap();
                        if (imageBlob) {
                            setUploadedFileUrl(imageBlob);
                            setUploadedFileId(imageDetail?.id);
                            setFileType("image");
                            setValue("fileName", imageDetail?.file_name);
                        }
                    } else {
                        const videoParams: IS3BinaryParams = {
                            bucket_name: APP.BUCKET_S3,
                            type: "video",
                            path: `server-test-01/video/${userInfo?.id}/${video_id}.mp4`
                        };
                        const videoUrl: any = await dispatch(getBinaryFile(videoParams)).unwrap();
                        const videoDetail: any = await dispatch(getVideoById(video_id)).unwrap();
                        if (videoUrl) {
                            setUploadedFileUrl(videoUrl);
                            setUploadedFileId(videoDetail?.id);
                            setFileType("video");
                            setValue("fileName", videoDetail?.file_name);
                        }
                    }

                    if (audio_id) {
                        const audioParams: IS3BinaryParams = {
                            bucket_name: APP.BUCKET_S3,
                            type: "audio",
                            path: `server-test-01/audio/${userInfo?.id}/${audio_id}.wav`
                        };
                        const audioUrl: any = await dispatch(getBinaryFile(audioParams)).unwrap();
                        const audioDetail: any = await dispatch(getAudioById(audio_id)).unwrap();
                        if (audioUrl) {
                            setUploadedAudioUrl(audioUrl);
                            setUploadedAudioId(audioDetail?.id);
                            setValue("audioName", audioDetail?.file_name);
                        }
                    }
                };

                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    }, [generationId]);

    return (
        <div className="studio__right__tabs">
            <form noValidate method="POST" action="#" onSubmit={handleSubmit(handleGenerateAvatar)}>
                <div className="studio__tabs__button">
                    {tabsData.map((tab, idx) => (
                        <button
                            type="button"
                            key={idx}
                            className={`studio__right__border ${
                                idx === activeTabIndex
                                    ? "border-third"
                                    : "border-transparent hover:border-secondary"
                            }`}
                            onClick={() => handleTabChange(idx)}
                        >
                            <span className="studio__right__text">{tab.label}</span>
                        </button>
                    ))}
                </div>
                <div className="studio__right__context">{tabsData[activeTabIndex].content}</div>
                <AudioUploader
                    register={register}
                    setValue={setValue}
                    file={watchAllFields["audio"]}
                    uploadedAudioUrl={uploadedAudioUrl}
                    setUploadedAudioUrl={setUploadedAudioUrl}
                    setUploadedAudioId={setUploadedAudioId}
                />
                <div className="studio__right__button">
                    <button className="studio__next__button" type="submit">
                        <span>Generate</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudioCreate;
