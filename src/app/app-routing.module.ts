import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDemoOneComponent } from './components/pages/home-demo-one/home-demo-one.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { HomeDemoThreeComponent } from './components/pages/home-demo-three/home-demo-three.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { JobsGridPageComponent } from './components/pages/jobs-grid-page/jobs-grid-page.component';
import { JobsListingPageComponent } from './components/pages/jobs-listing-page/jobs-listing-page.component';
import { JobDetailsPageComponent } from './components/pages/job-details-page/job-details-page.component';
import { CandidatesPageComponent } from './components/pages/candidates-page/candidates-page.component';
import { CandidateDetailsPageComponent } from './components/pages/candidate-details-page/candidate-details-page.component';
import { EmployersPageComponent } from './components/pages/employers-page/employers-page.component';
import { EmployerDetailsPageComponent } from './components/pages/employer-details-page/employer-details-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { PricingPageComponent } from './components/pages/pricing-page/pricing-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/terms-conditions-page/terms-conditions-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { CategoriesPageComponent } from './components/pages/categories-page/categories-page.component';
import { EmployersDashboardComponent } from './components/employers-dashboard/employers-dashboard.component';
import { EDashboardComponent } from './components/employers-dashboard/e-dashboard/e-dashboard.component';
import { EdCompanyProfileComponent } from './components/employers-dashboard/ed-company-profile/ed-company-profile.component';
import { EdPostANewJobComponent } from './components/employers-dashboard/ed-post-a-new-job/ed-post-a-new-job.component';
import { EdManageJobsComponent } from './components/employers-dashboard/ed-manage-jobs/ed-manage-jobs.component';
import { EdAllApplicantsComponent } from './components/employers-dashboard/ed-all-applicants/ed-all-applicants.component';
import { EdResumesComponent } from './components/employers-dashboard/ed-resumes/ed-resumes.component';
import { EdMessageComponent } from './components/employers-dashboard/ed-message/ed-message.component';
import { EdChangePasswordComponent } from './components/employers-dashboard/ed-change-password/ed-change-password.component';
import { CandidatesDashboardComponent } from './components/candidates-dashboard/candidates-dashboard.component';
import { CDashboardComponent } from './components/candidates-dashboard/c-dashboard/c-dashboard.component';
import { CdProfileComponent } from './components/candidates-dashboard/cd-profile/cd-profile.component';
import { CdResumeComponent } from './components/candidates-dashboard/cd-resume/cd-resume.component';
import { CdBookmarksComponent } from './components/candidates-dashboard/cd-bookmarks/cd-bookmarks.component';
import { CdAppliedJobsComponent } from './components/candidates-dashboard/cd-applied-jobs/cd-applied-jobs.component';
import { CdAlertJobsComponent } from './components/candidates-dashboard/cd-alert-jobs/cd-alert-jobs.component';
import { CdMessageComponent } from './components/candidates-dashboard/cd-message/cd-message.component';
import { CdChangePasswordComponent } from './components/candidates-dashboard/cd-change-password/cd-change-password.component';
import { HomeComponent } from './components/home/home.component';
import { EdEditAccountComponent } from './components/employers-dashboard/ed-edit-account/ed-edit-account.component';
import { CdCompanyProfileComponent } from './components/candidates-dashboard/cd-company-profile/cd-company-profile.component';
import { CdManageJobsComponent } from './components/candidates-dashboard/cd-manage-jobs/cd-manage-jobs.component';
import { CdAllApplicantsComponent } from './components/candidates-dashboard/cd-all-applicants/cd-all-applicants.component';
import { CdEditAccountComponent } from './components/candidates-dashboard/cd-edit-account/cd-edit-account.component';
import { CdPostANewJobComponent } from './components/candidates-dashboard/cd-post-a-new-job/cd-post-a-new-job.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ResetEmailSendComponent } from './components/forget-pass/reset-email-send/reset-email-send.component';
import { ResetOtpComponent } from './components/forget-pass/reset-otp/reset-otp.component';
import { ResetPassComponent } from './components/forget-pass/reset-pass/reset-pass.component';

const routes: Routes = [
    // {path: '', component: HomeDemoOneComponent},
    {path: '', component: HomeComponent},
    // {path: 'index-2', component: HomeDemoTwoComponent},
    // {path: 'index-3', component: HomeDemoThreeComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'pricing', component: PricingPageComponent},
    {path: 'jobs-grid', component: JobsGridPageComponent},
    {path: 'jobs-listing', component: JobsListingPageComponent},
    {path: 'job-details', component: JobDetailsPageComponent},
    // {path: 'categories', component: CategoriesPageComponent},
    {path: 'candidates', component: CandidatesPageComponent,
      canActivate: [AuthGuard],
      data: { expectedRole: 'employer' },
    },
    {path: 'candidate-details', component: CandidateDetailsPageComponent},
    {path: 'employers', component: EmployersPageComponent,
      canActivate: [AuthGuard],
      data: { expectedRole: 'candidate' },
    },
    {path: 'employer-details', component: EmployerDetailsPageComponent},
    // {path: 'faq', component: FaqPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    // {path: 'blog', component: BlogPageComponent},
    // {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'reset-pass', component: ResetEmailSendComponent},
    {path: 'reset-otp', component: ResetOtpComponent},
    {path: 'reset-new-pass', component: ResetPassComponent},
    {
        path: 'dashboard',
        component: EmployersDashboardComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'employer' },


        children: [
            {path: '', component: EDashboardComponent},
            {path: 'company-profile', component: EdCompanyProfileComponent},

            {path: 'post-a-new-job', component: EdPostANewJobComponent},
            {path: 'manage-jobs', component: EdManageJobsComponent},
            {path: 'all-applicants', component: EdAllApplicantsComponent},
            {path: 'resumes', component: EdResumesComponent},
            {path: 'message', component: EdMessageComponent},
            {path: 'change-password', component: EdChangePasswordComponent},
            {path: 'edit-account', component: EdEditAccountComponent},

        ]
    },
    {
        path: 'candidates-dashboard',
        component: CandidatesDashboardComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'candidate' } ,


        children: [
            {path: '', component: CDashboardComponent},
            {path: 'company-profile', component: CdCompanyProfileComponent},
            {path: 'bookmarks', component: CdBookmarksComponent},
            {path: 'applied_jobs', component: CdAppliedJobsComponent},
            {path: 'message', component: CdMessageComponent},

            {path: 'post-a-new-job', component: CdPostANewJobComponent},
            {path: 'manage-jobs', component: CdManageJobsComponent},
            {path: 'all-applicants', component: CdAllApplicantsComponent},
            {path: 'resumes', component: CdResumeComponent},
            {path: 'edit-account', component: CdEditAccountComponent},
            {path: 'change-password', component: CdChangePasswordComponent},

        ]
    },
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
