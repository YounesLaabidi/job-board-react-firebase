import "./css/style.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
// JOB
import Jobs from "./components/job/Jobs";
import JobDetail from "./components/job/JobDetail";
import JobApplication from "./components/job/JobApplication";
import JobPosting from "./components/job/JobPosting";
// AUTH
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/signup";
import {
  Authenticated,
  EmployerRoutes,
  NotAuthenticated,
} from "./components/auth/ProtectedRoutes";
import Candidats from "./components/candidats/Candidats";
import CandidatDetail from "./components/candidats/CandidatDetail";
import "./App.css";
import { AuthProvider } from "./providers/AuthProvider";
import { Layout } from "./components/Layout";
import UpdateProfile from "./components/dashboard/UpdateProfile";
import CreateProfile from "./components/candidats/CreateProfile";
import JobPostedByMe from "./components/job/JobPostedByMe";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route element={<Authenticated />}>
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<NotAuthenticated />}>
              <Route path="/setup" element={<CreateProfile />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Jobs />} />
                <Route path="jobs/:id" element={<JobDetail />} />
                <Route path="jobs/:id/apply" element={<JobApplication />} />
                <Route path="settings" element={<UpdateProfile />} />
                <Route element={<EmployerRoutes />}>
                  <Route path="post" element={<JobPosting />} />
                  <Route path="job-posted" element={<JobPostedByMe />} />
                  <Route path="job-posted/:id/" element={<Candidats />} />
                  <Route
                    path="job-posted/:jobId/candidats/:candidatId"
                    element={<CandidatDetail />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>{" "}
    </AuthProvider>
  );
}

export default App;
