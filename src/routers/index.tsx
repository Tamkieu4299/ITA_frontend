import React from "react";
import { PAGE_URL } from "constants/configs";
import { Final } from "pages/Studio/template/Final/Final";
import Auth from "pages/Auth";
import Login from "pages/Auth/template/Login";
import Signup from "pages/Auth/template/Signup";
import { Studio } from "pages/Studio/Studio";
import { CVInformation } from "pages/CVInformation/CVInformation";
import { JDInformation } from "pages/JDInformation/JDInformation";
import { DisplayAvatarList } from "pages/DisplayAvatarList/DisplayAvatarList";
import { DisplayJobList } from "pages/DisplayJobList/DisplayJobList";
import { InterviewSession } from "pages/InterviewSession/InterviewSession";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { authSelector } from "store/selectors";
import RequiredAuth from "./RequiredAuth";
import User from "pages/User/User";
import Account from "pages/User/Account/Account";
import InterviewDetail from "pages/User/InterviewDetail/InterviewDetail";
import InterviewList from "pages/User/InterviewList/InterviewList";
import { Preview } from "pages/Studio/template/Preview/Preview";
import StudioCreate from "pages/Studio/template/StudioCreate/StudioCreate";
import ThankYou from "pages/ThankYou";

const Routers = () => {
    const { userInfo } = useAppSelector(authSelector);

    return (
        <Routes>
            <Route path={PAGE_URL.HOME} element={userInfo && <h2>Welcome {userInfo.id}</h2>} />
            <Route path={PAGE_URL.AUTH} element={<Auth />}>
                <Route path={PAGE_URL.LOGIN} element={<Login />} />
                <Route path={PAGE_URL.SIGNUP} element={<Signup />} />
            </Route>
            <Route path={PAGE_URL.JOB_LIST} element={<DisplayJobList />} />
            <Route element={<RequiredAuth allowedRoles={["interviewee"]} />}>
                <Route path={PAGE_URL.CV_INFORMATION} element={<CVInformation />} />
                <Route path={PAGE_URL.BASE_AVATAR_LIST} element={<DisplayAvatarList />} />
                <Route path={PAGE_URL.INTERVIEW_SESSION} element={<InterviewSession />} />
                <Route path={PAGE_URL.THANK_YOU} element={<ThankYou />} />
            </Route>
            <Route element={<RequiredAuth allowedRoles={["interviewer"]} />}>
                <Route path={PAGE_URL.STUDIO} element={<Studio />}>
                    <Route path={PAGE_URL.STUDIO_CREATE} element={<StudioCreate />} />
                    <Route path={PAGE_URL.STUDIO_EDIT_DETAIL} element={<StudioCreate />} />
                    <Route path={PAGE_URL.STUDIO_PREVIEW} element={<Preview />} />
                    <Route path={PAGE_URL.STUDIO_FINAL} element={<Final />} />
                </Route>
                <Route path={PAGE_URL.JD_INFORMATION} element={<JDInformation />} />
                <Route path={PAGE_URL.USER} element={<User />}>
                    <Route path={PAGE_URL.ACCOUNT} element={<Account />} />
                    <Route path={PAGE_URL.INTERVIEW_BASE} element={<InterviewList />} />
                    <Route path={PAGE_URL.INTERVIEW_DETAIL} element={<InterviewDetail />} />
                </Route>
            </Route>

            <Route path="*" element={<h2>Not found</h2>} />
        </Routes>
    );
};

export default Routers;
