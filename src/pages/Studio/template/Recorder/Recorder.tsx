/* eslint-disable camelcase */
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import "./Recorder.css";
import { useRef, useState, useEffect } from "react";
import instructionArray from "../../../../constants/recordingInstruction.json";
import { StartRecording, StopRecording } from "assets";
import { IStudioForm } from "pages/interface";
import { UseFormSetValue } from "react-hook-form";
import { NullableBlob } from "types/generatedAvatar";

interface Props {
    setValue: UseFormSetValue<IStudioForm>;
    videoBlob: NullableBlob;
}

export const Recorder = (props: Props) => {
    const { setValue, videoBlob } = props;
    const [recorder, setRecorder] = useState<MediaRecorder | null>();
    const [stream, setStream] = useState<MediaStream | null>();
    const [cameraStatus, setCameraStatus] = useState("off");
    const [state, setState] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const video = useRef<HTMLVideoElement>(null);

    const handleDataAvailable = (ev: BlobEvent) => {
        setValue("recorder", ev.data);
    };

    const openCamera = async () => {
        if (cameraStatus === "on") {
            if (video.current) {
                video.current.pause();
                video.current.srcObject = null;
            }
            stream?.getTracks().forEach((track) => {
                track.stop();
            });
            setValue("recorder", null);
            setCameraStatus("off");
            setStream(null);
        } else {
            const mediaDevices = navigator.mediaDevices;
            const stream: MediaStream = await mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            if (video.current) {
                video.current.srcObject = stream;
                video.current.play();
            }
            setValue("recorder", null);
            setCameraStatus("on");
            setStream(stream);
        }
    };

    const startRecording = async () => {
        if (stream) {
            const recorder = new MediaRecorder(stream);
            recorder.addEventListener("dataavailable", handleDataAvailable);
            recorder.start();
            setRecorder(recorder);
        }
        if (cameraStatus === "on" && !stream) {
            const mediaDevices = navigator.mediaDevices;
            const stream: MediaStream = await mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            const recorder = new MediaRecorder(stream);
            recorder.addEventListener("dataavailable", handleDataAvailable);
            recorder.start();
            setValue("recorder", null);
            if (video.current) {
                video.current.srcObject = stream;
                video.current.play();
            }
            setRecorder(recorder);
            setStream(stream);
        }
        setState(true);
    };

    const stopRecording = async () => {
        if (recorder) {
            recorder.stop();
            stream?.getTracks().forEach((track) => {
                track.stop();
            });
            setStream(null);
            setState(false);
            setRecorder(null);
        }
    };

    useEffect(() => {
        if (!recorder) {
            setTextIndex(0);
            return;
        }
        if (textIndex == instructionArray.length - 1) {
            return;
        }
        setTimeout(() => {
            setTextIndex(textIndex + 1);
        }, instructionArray[textIndex].duration);
    }, [textIndex, recorder]);

    return (
        <div className="recorder">
            <div className="recorder__container">
                <div className="recorder__right">
                    <div className="recorder__right__video">
                        <div className="recorder__desc">
                            {cameraStatus === "off" && (
                                <div className="recorder__form__title">
                                    <span className="recorder__title__head">Record your video</span>
                                    <p className="recorder__title__desc">
                                        Make sure you follow the instructions from the system
                                    </p>
                                </div>
                            )}
                            <p className="recorder__desc__paragraph">
                                {instructionArray[textIndex].content}
                            </p>
                            <div className="recorder__controllers">
                                <button
                                    type="button"
                                    aria-label="Open Camera"
                                    color="black"
                                    onClick={openCamera}
                                    className="recorder__controllers__button"
                                >
                                    {cameraStatus === "on" ? "Close Camera" : "Open Camera"}
                                </button>
                                <div className="recorder__controllers__button__record">
                                    <button
                                        type="button"
                                        className="recorder__controllers__button--recording"
                                        onClick={startRecording}
                                    >
                                        {state ? (
                                            <span className="recording__button--recording__dot">
                                                <span className="recording__button--recording__dot__base"></span>
                                                <span className="recording__button--recording__dot__flash"></span>
                                            </span>
                                        ) : (
                                            <StartRecording />
                                        )}
                                    </button>
                                </div>
                                <div className="recorder__controllers__button__record">
                                    <button
                                        type="button"
                                        className="recorder__controllers__button--normal"
                                        onClick={stopRecording}
                                    >
                                        <StopRecording />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {videoBlob ? (
                            <div className="video__object">
                                <Player src={window.URL.createObjectURL(videoBlob)} />
                            </div>
                        ) : (
                            <video ref={video} className="video__object--none"></video>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
