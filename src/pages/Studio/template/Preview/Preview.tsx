/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { useState, useEffect, useRef } from "react";
import "./Preview.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authSelector, studioSelector } from "store/selectors";
import UndoIcon from "@mui/icons-material/Undo";
import {
    createAvatarGeneration,
    getGenerationByUser,
    sendGenerationTalkingHead,
    updateGenerationType
} from "pages/Studio/studioSlice";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { GeneratedAvatar } from "types/generatedAvatar";
import APP, { PAGE_URL } from "constants/configs";

export const Preview = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { avatarList } = useAppSelector(studioSelector);
    const { userInfo } = useAppSelector(authSelector);
    const [showModal, setShowModal] = useState(false);
    const [currentVideo, setCurrentvideo] = useState<number>(0);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = (id: number) => {
        setCurrentvideo(id);
        setShowModal(true);
    };

    const handleSubmitText = async (event: React.FormEvent) => {
        event.preventDefault();
        if (textRef.current) {
            try {
                const currentTask = avatarList[currentVideo];
                const { audio_id, image_id, video_id, user_id } = currentTask;
                const videoKey = video_id ? `server-test-01/video/${user_id}/${video_id}.mp4` : "";
                const audioKey = audio_id ? `server-test-01/audio/${user_id}/${audio_id}.wav` : "";
                const imageKey = image_id ? `server-test-01/image/${user_id}/${image_id}.jpg` : "";
                console.log(
                    `Send to ML: video_key: ${videoKey} audio_key: ${audioKey} image_key: ${imageKey}`
                );

                const generationParams: Omit<GeneratedAvatar, "id"> = {
                    audio_id,
                    video_id,
                    image_id,
                    user_id,
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
                    text: textRef.current.value
                };
                await dispatch(sendGenerationTalkingHead(sendMLParams)).unwrap();

                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        setShowModal(false);
    };

    const handleConfirmGeneration = async (id: string) => {
        const userId = userInfo?.id;
        const params: Partial<GeneratedAvatar> = {
            user_id: userId,
            id,
            type: "base"
        };

        await dispatch(updateGenerationType(params));
        navigate(PAGE_URL.STUDIO_FINAL);
    };

    useEffect(() => {
        // eslint-disable-next-line camelcase
        dispatch(
            getGenerationByUser({
                user_id: userInfo?.id,
                type: "generated"
            })
        );
    }, []);

    return (
        <div className="preview">
            {showModal && (
                <>
                    <div className="preview__modelbox">
                        <div className="preview__modelbox__container">
                            <div className="preview__modelbox__items">
                                <div className="preview__modelbox__item">
                                    <div className="preview__modelbox__content">
                                        <textarea
                                            className="preview__modelbox__input"
                                            ref={textRef}
                                        />
                                    </div>
                                </div>
                                <div className="preview__modelbox__buttons">
                                    <button
                                        className="preview__modelbox__button--close"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="preview__modelbox__button--submit"
                                        type="button"
                                        onClick={handleSubmitText}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="preview__modelbox__fade"></div>
                </>
            )}
            <div className="preview__container__right">
                {avatarList &&
                    avatarList.map((v, index) => (
                        <div key={index} className="preview__video">
                            <Player
                                src={`${APP.API_URL}/api/v1/studio/s3/get_binary_video_convert_codecs/?bucket_name=${v.bucket_s3}&path=${v.path_s3}&type=video`}
                            />
                            <div className="preview__controllers">
                                <UndoIcon
                                    className="preview__controllers-undo"
                                    onClick={() => {
                                        navigate(`${PAGE_URL.STUDIO_EDIT_BASE}/${v.id}`);
                                    }}
                                />
                                <div className="flex space-x-2 align-center">
                                    <EditIcon
                                        onClick={() => handleInput(index)}
                                        className="preview__controllers-input"
                                    />
                                    <DoneIcon
                                        className="preview__controllers-check"
                                        onClick={() => handleConfirmGeneration(v.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
