import { Refine, Authenticated } from "@refinedev/core";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import {
  ErrorComponent,
  useNotificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutContextProvider,
  useThemedLayoutContext,
} from "@refinedev/mui";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { theme } from "./theme";
import { CustomSider } from "./components/CustomSider";
import { CustomHeader } from "./components/CustomHeader";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";

import { Dashboard } from "./pages/dashboard";
import { LoginPage } from "./pages/login";

import { ProjectList } from "./pages/projects/list";
import { ProjectCreate } from "./pages/projects/create";
import { ProjectEdit } from "./pages/projects/edit";

import { ProjectCategoryList } from "./pages/projectCategories/list";
import { ProjectCategoryCreate } from "./pages/projectCategories/create";
import { ProjectCategoryEdit } from "./pages/projectCategories/edit";

import { SkillList } from "./pages/skills/list";
import { SkillCreate } from "./pages/skills/create";
import { SkillEdit } from "./pages/skills/edit";

import { SkillCategoryList } from "./pages/skillCategories/list";
import { SkillCategoryCreate } from "./pages/skillCategories/create";
import { SkillCategoryEdit } from "./pages/skillCategories/edit";

import { ServiceList } from "./pages/services/list";
import { ServiceCreate } from "./pages/services/create";
import { ServiceEdit } from "./pages/services/edit";

import { ContactInfoList } from "./pages/contactInfo/list";
import { ContactInfoCreate } from "./pages/contactInfo/create";
import { ContactInfoEdit } from "./pages/contactInfo/edit";

import { SocialAccountList } from "./pages/socialAccounts/list";
import { SocialAccountCreate } from "./pages/socialAccounts/create";
import { SocialAccountEdit } from "./pages/socialAccounts/edit";

import { BlogList } from "./pages/blogs/list";
import { BlogCreate } from "./pages/blogs/create";
import { BlogEdit } from "./pages/blogs/edit";

import { EducationList } from "./pages/educations/list";
import { EducationCreate } from "./pages/educations/create";
import { EducationEdit } from "./pages/educations/edit";

import { WorkExperienceList } from "./pages/workExperiences/list";
import { WorkExperienceCreate } from "./pages/workExperiences/create";
import { WorkExperienceEdit } from "./pages/workExperiences/edit";

import { ClientList } from "./pages/clients/list";
import { ClientCreate } from "./pages/clients/create";
import { ClientEdit } from "./pages/clients/edit";

import { TestimonialList } from "./pages/testimonials/list";
import { TestimonialCreate } from "./pages/testimonials/create";
import { TestimonialEdit } from "./pages/testimonials/edit";

import { SystemFeatureList } from "./pages/systemFeatures/list";
import { SystemFeatureCreate } from "./pages/systemFeatures/create";
import { SystemFeatureEdit } from "./pages/systemFeatures/edit";

import { CVList } from "./pages/cv/list";
import { CVCreate } from "./pages/cv/create";
import { CVEdit } from "./pages/cv/edit";

function AppLayout() {
  const { siderCollapsed } = useThemedLayoutContext();
  return (
    <>
      <CustomSider />
      <CustomHeader />
      <Box
        component="main"
        sx={{
          ml: siderCollapsed ? "68px" : "256px",
          mt: "64px",
          p: 3,
          minHeight: "calc(100vh - 64px)",
          bgcolor: "background.default",
          transition: "margin-left 0.25s ease",
        }}
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Box>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RefineSnackbarProvider>
        <Refine
          routerProvider={routerBindings}
          dataProvider={dataProvider}
          authProvider={authProvider}
          notificationProvider={useNotificationProvider}
          resources={[
            {
              name: "projects",
              list: "/projects",
              create: "/projects/create",
              edit: "/projects/edit/:id",
              meta: { label: "Projects" },
            },
            {
              name: "projects-category",
              list: "/project-categories",
              create: "/project-categories/create",
              edit: "/project-categories/edit/:id",
              meta: { label: "Project Categories" },
            },
            {
              name: "skills",
              list: "/skills",
              create: "/skills/create",
              edit: "/skills/edit/:id",
              meta: { label: "Skills" },
            },
            {
              name: "skills-category",
              list: "/skill-categories",
              create: "/skill-categories/create",
              edit: "/skill-categories/edit/:id",
              meta: { label: "Skill Categories" },
            },
            {
              name: "services",
              list: "/services",
              create: "/services/create",
              edit: "/services/edit/:id",
              meta: { label: "Services" },
            },
            {
              name: "blogs",
              list: "/blogs",
              create: "/blogs/create",
              edit: "/blogs/edit/:id",
              meta: { label: "Blogs" },
            },
            {
              name: "educations",
              list: "/educations",
              create: "/educations/create",
              edit: "/educations/edit/:id",
              meta: { label: "Education" },
            },
            {
              name: "work-experiences",
              list: "/work-experiences",
              create: "/work-experiences/create",
              edit: "/work-experiences/edit/:id",
              meta: { label: "Work Experiences" },
            },
            {
              name: "clients",
              list: "/clients",
              create: "/clients/create",
              edit: "/clients/edit/:id",
              meta: { label: "Clients" },
            },
            {
              name: "testimonials",
              list: "/testimonials",
              create: "/testimonials/create",
              edit: "/testimonials/edit/:id",
              meta: { label: "Testimonials" },
            },
            {
              name: "contact-info",
              list: "/contact-info",
              create: "/contact-info/create",
              edit: "/contact-info/edit/:id",
              meta: { label: "Contact Info" },
            },
            {
              name: "social-account",
              list: "/social-accounts",
              create: "/social-accounts/create",
              edit: "/social-accounts/edit/:id",
              meta: { label: "Social Accounts" },
            },
            {
              name: "system-features",
              list: "/system-features",
              create: "/system-features/create",
              edit: "/system-features/edit/:id",
              meta: { label: "System Features" },
            },
            {
              name: "cv",
              list: "/cv",
              create: "/cv/create",
              edit: "/cv/edit/:id",
              meta: { label: "CV Management" },
            },
          ]}
          options={{ syncWithLocation: true, warnWhenUnsavedChanges: true }}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-layout"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <ThemedLayoutContextProvider>
                    <AppLayout />
                  </ThemedLayoutContextProvider>
                </Authenticated>
              }
            >
              <Route index element={<Dashboard />} />

              <Route path="/projects">
                <Route index element={<ProjectList />} />
                <Route path="create" element={<ProjectCreate />} />
                <Route path="edit/:id" element={<ProjectEdit />} />
              </Route>

              <Route path="/project-categories">
                <Route index element={<ProjectCategoryList />} />
                <Route path="create" element={<ProjectCategoryCreate />} />
                <Route path="edit/:id" element={<ProjectCategoryEdit />} />
              </Route>

              <Route path="/skills">
                <Route index element={<SkillList />} />
                <Route path="create" element={<SkillCreate />} />
                <Route path="edit/:id" element={<SkillEdit />} />
              </Route>

              <Route path="/skill-categories">
                <Route index element={<SkillCategoryList />} />
                <Route path="create" element={<SkillCategoryCreate />} />
                <Route path="edit/:id" element={<SkillCategoryEdit />} />
              </Route>

              <Route path="/services">
                <Route index element={<ServiceList />} />
                <Route path="create" element={<ServiceCreate />} />
                <Route path="edit/:id" element={<ServiceEdit />} />
              </Route>

              <Route path="/blogs">
                <Route index element={<BlogList />} />
                <Route path="create" element={<BlogCreate />} />
                <Route path="edit/:id" element={<BlogEdit />} />
              </Route>

              <Route path="/educations">
                <Route index element={<EducationList />} />
                <Route path="create" element={<EducationCreate />} />
                <Route path="edit/:id" element={<EducationEdit />} />
              </Route>

              <Route path="/work-experiences">
                <Route index element={<WorkExperienceList />} />
                <Route path="create" element={<WorkExperienceCreate />} />
                <Route path="edit/:id" element={<WorkExperienceEdit />} />
              </Route>

              <Route path="/clients">
                <Route index element={<ClientList />} />
                <Route path="create" element={<ClientCreate />} />
                <Route path="edit/:id" element={<ClientEdit />} />
              </Route>

              <Route path="/testimonials">
                <Route index element={<TestimonialList />} />
                <Route path="create" element={<TestimonialCreate />} />
                <Route path="edit/:id" element={<TestimonialEdit />} />
              </Route>

              <Route path="/contact-info">
                <Route index element={<ContactInfoList />} />
                <Route path="create" element={<ContactInfoCreate />} />
                <Route path="edit/:id" element={<ContactInfoEdit />} />
              </Route>

              <Route path="/social-accounts">
                <Route index element={<SocialAccountList />} />
                <Route path="create" element={<SocialAccountCreate />} />
                <Route path="edit/:id" element={<SocialAccountEdit />} />
              </Route>

              <Route path="/system-features">
                <Route index element={<SystemFeatureList />} />
                <Route path="create" element={<SystemFeatureCreate />} />
                <Route path="edit/:id" element={<SystemFeatureEdit />} />
              </Route>

              <Route path="/cv">
                <Route index element={<CVList />} />
                <Route path="create" element={<CVCreate />} />
                <Route path="edit/:id" element={<CVEdit />} />
              </Route>
            </Route>

            <Route
              element={
                <Authenticated
                  key="authenticated-login"
                  fallback={<Outlet />}
                >
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
