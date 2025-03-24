
import './App.css';
import React from 'react';
import {HashRouter,Route,Routes,Navigate} from 'react-router-dom';
import Layout from './Shades/Layouts/layout';
import Loader from './Components/Loader/Loader';
import RetriveNotification from './Service/RetriveNotification';
import NotificationDisplay from './Service/NotificationDisplay';
import PrivateRoute from './Shades/Layouts/PrivateRoute';


const WelcomePage = React.memo(React.lazy(()=>import("./Pages/WelcomePage/welcome")));
const Login = React.memo(React.lazy(()=>import("./Pages/Onboarding/login")));
const Dashboard=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/HomeScreens/Dashboard")));
const EditProfile=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/EditProfile")));
const Account=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/AccountFiles/Account")));
const CertificateScreen=React.memo(React.lazy(()=>import("./Pages/Certificates/CertificateScreen")));
const Downloads=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Download/Downloads")));
const Favorites=React.memo(React.lazy(()=>import("./Pages/Favorites/Favorites")));
const BuyTicket=React.memo(React.lazy(()=>import("./Pages/Notification/BuyTicket")));
const AccreditedCertificates=React.memo(React.lazy(()=>import("./Pages/Certificates/AccreditedCertificates")));
const CertificateAccridation=React.memo(React.lazy(()=>import("./Pages/Certificates/CertificateAccridation")));
const SubscriptionSuccess=React.memo(React.lazy(()=>import("./Pages/Billing/SubscriptionSuccess")));


const Help=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Help&Support/Help")));
const Support=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Help&Support/Support")));
const Privacy=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Help&Support/Privacy")));
const Terms=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Help&Support/Terms")));
const AboutUs=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Help&Support/AboutUs")));
const SideNotification=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Help&Support/SideNotification")));

const Category=React.memo(React.lazy(()=>import("./Pages/Categories/Category")));
const Notification=React.memo(React.lazy(()=>import("./Pages/Notification/Notification")));
const CategoryDetails=React.memo(React.lazy(()=>import("./Pages/Categories/CategoryDetails")));
const InsideCategory=React.memo(React.lazy(()=>import("./Pages/Categories/InsideCategory")));
const Starttest=React.memo(React.lazy(()=>import("./Pages/Categories/testScreens/Starttest")));
const FirstTest=React.memo(React.lazy(()=>import("./Pages/Categories/testScreens/FirstTest")));
const SubmitTest=React.memo(React.lazy(()=>import("./Pages/Categories/testScreens/SubmitTest")));
const Certificate=React.memo(React.lazy(()=>import("./Pages/Categories/testScreens/Certificate")));
const VideoScreen=React.memo(React.lazy(()=>import("./Pages/VideoClasses/VideoScreen")));
const Search=React.memo(React.lazy(()=>import("./Pages/Search/Search")));
const Premium=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/Premium")));
const PremiumBar=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/PremiumBar")));
const CredentialForm=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/CredentialForm")));
const ChangeCredential=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/ChangeCredential")));
const SchoolProfile=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/SchoolProfile")));


const InsideCredential=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/InsideCredential")));
const Accreditation=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/Accreditation/Accreditation")));
const ProfileCredential=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/Accreditation/ProfileCredential")));
const EditTeacher=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/EditTeacher")));
const Iteach=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/Iteach")));
const TeachingExperience=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeachingExperience")));
const ExperienceForm=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/ExperienceForm/ExperienceForm")));
const YogaClass=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherYogaClass/YogaClass")));
const Languages=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherYogaClass/Languages")));
const OtherCertificates=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherYogaClass/OtherCertifictes")));
const BodsphereCerificates=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherYogaClass/BodsphereCerificates")));

const SchoolDetails=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/SchoolDetails")));
const EditSchoolDetails=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/EditSchoolDetails")));
const Faculty=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/Faculty")));
const Registration=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/Registration")));
const SocialMediaLinks=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/SocialMediaLinks")));
const Documentation=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/Documentation")));
const WeTeach=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/SchoolDetails/WeTeach")));
const Training=React.memo(React.lazy(()=>import("./Pages/GetAllCategories/Training")));
const  FaqArticles=React.memo(React.lazy(()=>import("./Pages/FAQ/FaqArticles")))
const TeacherTeachingExperience=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherTeachingExperience")));
const TeacherExperienceForm=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherExperienceForm")));
const TeacherOnlineOffline=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherOnlineOffline")));
const TeacherLanguages=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherLanguages")));
const TeacherBodsphereCertificates=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherBodsphereCertificates")));
const TeacherOtherCertificate=React.memo(React.lazy(()=>import("./Pages/PremiumScreens/TeacherDetails/TeacherOtherCertificate")));


const Impact=React.memo(React.lazy(()=>import("./Pages/BecomeMember/Impact")));
const BecomeMember=React.memo(React.lazy(()=>import("./Pages/BecomeMember/BecomeMember")));
const BecomeStudent=React.memo(React.lazy(()=>import("./Pages/BecomeMember/BecomeStudent")));
const  SeeAllRecommended=React.memo(React.lazy(()=>import("./Pages/ViewAll/SeeAllRecommended")));
const  SeeAllInstructors=React.memo(React.lazy(()=>import("./Pages/ViewAll/SeeAllInstructors")));
const  SeeAllMusic=React.memo(React.lazy(()=>import("./Pages/ViewAll/SeeAllMusic")));
const  Audio=React.memo(React.lazy(()=>import("./Pages/Audio/Audio")));
const  FavAudio=React.memo(React.lazy(()=>import("./Pages/Audio/FavAudio")));

const CommonVideo=React.memo(React.lazy(()=>import("./Pages/VideoClasses/CommonVideo")));
const InstructorVideo=React.memo(React.lazy(()=>import("./Pages/VideoClasses/InstructorVideo")));

const InstructorAudio=React.memo(React.lazy(()=>import("./Pages/Audio/InstructorAudio")));


// const PlayVideo=React.lazy(()=>import("./Pages/VideoAlbum/PlayVideo"))
const FAQSupport=React.memo(React.lazy(()=>import("./Pages/FAQ/FAQSupport")));
const PlayDownloads=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Download/PlayDownloads")));
const PlayAudio=React.memo(React.lazy(()=>import("./Pages/Dashboard-Home/Download/PlayAudio")));
const PlayVideos=React.memo(React.lazy(()=>import("./Pages/VideoAlbum/PlayVideos")));

const  Layout1=React.memo(React.lazy(()=>import("./Pages/Categories/Layout1")));
const  Layout2=React.memo(React.lazy(()=>import("./Pages/Categories/Layout2")));
const  LayoutFilter=React.memo(React.lazy(()=>import("./Pages/Categories/LayoutFilter")));
const  FAQ=React.memo(React.lazy(()=>import("./Pages/FAQ/FAQ")));
const  ContactUs=React.memo(React.lazy(()=>import("./Pages/ContactUs/ContactUs")));
const  EmailSupport=React.memo(React.lazy(()=>import("./Pages/ContactUs/EmailSupport")));

const  AIMusic=React.memo(React.lazy(()=>import("./Pages/AIMusic/AIMusic")));
const  Documents=React.memo(React.lazy(()=>import("./Pages/Document/Documents")));

const  LiveSessions=React.memo(React.lazy(()=>import("./Pages/LiveSessions/LiveSessions")));
const  GetLiveSessions=React.memo(React.lazy(()=>import("./Pages/LiveSessions/GetLiveSessions")));
const  DisplayAll=React.memo(React.lazy(()=>import("./Pages/Search/DisplayAll")));
const  VideoAlbum=React.memo(React.lazy(()=>import("./Pages/VideoAlbum/VideoAlbum")));

const CourseVideo=React.memo(React.lazy(()=>import("./Pages/VideoClasses/CourseVideo")));
const ReccomendedVideo=React.memo(React.lazy(()=>import("./Pages/VideoClasses/ReccomendedVideo")));

const LiveEvents=React.memo(React.lazy(()=>import("./Pages/Notification/LiveEvents")));
const MusicAlbum=React.memo(React.lazy(()=>import("./Pages/Audio/MusicAlbum")));
const Billing=React.memo(React.lazy(()=>import("./Pages/Billing/Billing")));
const FeedBackForm=React.memo(React.lazy(()=>import("./Pages/Notification/FeedBackForm/FeedBackForm")));
const Layout3=React.memo(React.lazy(()=>import("./Pages/Categories/Layout3")));
const AlbumLayout=React.memo(React.lazy(()=>import("./Pages/Categories/AlbumLayout")));


function App() {
  const user_id=localStorage.getItem('user_id')
 
  
  return (
    <div className="App body">
     <React.Fragment>
      <HashRouter>
      <NotificationDisplay/>

        <React.Suspense fallback = {<Loader/>}>
        {/* <NotificationDisplay/> */}
        <Routes>
          <Route element={<Layout/>}>
          {/* <Route path="/" element={user_id ? <Navigate to="/Dashboard" /> : <WelcomePage />} /> */}
          <Route path="/" element= {<WelcomePage />}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/FaqArticles' element={<FaqArticles/>}/>
         <Route path='/Privacy' element={<Privacy/>}/>
         <Route path='/Terms' element={<Terms/>}/>
         <Route path='/FAQSupport' element={<FAQSupport/>}/>
         <Route path='/Impact' element={<Impact/>}/>
            <Route path='/BecomeMember' element={<BecomeMember/>}/>
            <Route path='/BecomeStudent' element={<BecomeStudent/>}/>
            <Route path='/FAQ' element={<FAQ/>}/>
            <Route path='/ContactUs' element={<ContactUs/>}/>
            <Route path='/EmailSupport' element={<EmailSupport/>}/>

     <Route element={<PrivateRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
           <Route path='/EditProfile' element={<EditProfile/>}/>
           <Route path='/Account' element={<Account/>} />
           <Route path='/CertificateScreen' element={<CertificateScreen/>} />
           <Route path='/AccreditedCertificates' element={<AccreditedCertificates/>} />
           <Route path='/CertificateAccridation' element={<CertificateAccridation/>} />
           <Route path='/success' element={<SubscriptionSuccess/>} />


           <Route path='/Downloads' element={<Downloads/>} />
           <Route path='/Favorites' element={<Favorites/>} />
           <Route path='/BuyTicket' element={<BuyTicket/>} />
           <Route path='/MusicAlbum' element={<MusicAlbum/>}/>
           
           <Route path='/Help' element={<Help/>}/>
           <Route path='/Support' element={<Support/>}/>
          
           <Route path='/AboutUs' element={<AboutUs/>}/>
           <Route path='/SideNotification' element={<SideNotification/>}/>
           <Route path='/Category' element={<Category/>}/>
           <Route path= '/Notification' element={<Notification />}/>
           <Route path= '/CategoryDetails' element={<CategoryDetails />}/>
           <Route path= '/InsideCategory' element={<InsideCategory/>}/>
            <Route path='/Starttest' element={<Starttest/>}/>
            <Route path='/FirstTest' element={<FirstTest/>}/>
            <Route path='/SubmitTest' element={<SubmitTest/>}/>
            <Route path='/Certificate' element={<Certificate/>}/>
            <Route path='/VideoScreen' element={<VideoScreen/>}/>
            <Route path='/CourseVideo' element={<CourseVideo/>}/>

            {/* <Route path='/PlayVideo' element={<PlayVideo/>}/> */}
            <Route path='/PlayDownloads' element={<PlayDownloads/>}/>
            <Route path='/PlayAudio' element={<PlayAudio/>}/>
            <Route path='/PlayVideos' element={<PlayVideos/>}/>

            <Route path='/Search' element={<Search/>}/>
            <Route path='/Premium' element={<Premium/>}/>
            <Route path='/PremiumBar' element={<PremiumBar/>}/>
            <Route path='/CredentialForm' element={<CredentialForm/>}/>
            <Route path='/ChangeCredential' element={<ChangeCredential/>}/>
            <Route path='/SchoolProfile' element={<SchoolProfile/>}/>

            <Route path='/InsideCredential' element={<InsideCredential/>}/>
            <Route path='/Accreditation' element={<Accreditation/>}/>
            <Route path='/ProfileCredential' element={<ProfileCredential/>}/>
            <Route path='/EditTeacher' element={<EditTeacher/>}/>
            <Route path='/Iteach' element={<Iteach/>}/>
            <Route path='/TeachingExperience' element={<TeachingExperience/>}/>
            <Route path='/ExperienceForm' element={<ExperienceForm/>}/>
            <Route path='/YogaClass' element={<YogaClass/>}/>
            <Route path='/Languages' element={<Languages/>}/>
            <Route path='/OtherCertificates' element={<OtherCertificates/>}/>
            <Route path='/BodsphereCerificates' element={<BodsphereCerificates/>}/>
            <Route path='/TeacherBodsphereCertificates' element={<TeacherBodsphereCertificates/>}/>

            <Route path='/SchoolDetails' element={<SchoolDetails/>}/>
            <Route path='/EditSchoolDetails' element={<EditSchoolDetails/>}/>
            <Route path='/Faculty' element={<Faculty/>}/>
            <Route path='/Registration' element={<Registration/>}/>
            <Route path='/SocialMediaLinks' element={<SocialMediaLinks/>}/>
            <Route path='/Documentation' element={<Documentation/>}/>
            <Route path='/WeTeach' element={<WeTeach/>}/>
            <Route path='/Training' element={<Training/>}/>
            <Route path='/TeacherTeachingExperience' element={<TeacherTeachingExperience/>}/>
            <Route path='/TeacherExperienceForm' element={<TeacherExperienceForm/>}/>
            <Route path='/TeacherOnlineOffline' element={<TeacherOnlineOffline/>}/>
            <Route path='/TeacherLanguages' element={<TeacherLanguages/>}/>
            <Route path='/TeacherOtherCertificate' element={<TeacherOtherCertificate/>}/>
            
           

            <Route path='/SeeAllRecommended' element={<SeeAllRecommended/>}/>
            <Route path='/SeeAllInstructors' element={<SeeAllInstructors/>}/>
            <Route path='/SeeAllMusic' element={<SeeAllMusic/>}/>

            <Route path='/Audio' element={<Audio/>}/>
            <Route path='/FavAudio' element={<FavAudio/>}/>


            <Route path='/CommonVideo' element={<CommonVideo/>}/>
            <Route path='/ReccomendedVideo' element={<ReccomendedVideo/>}/>
            <Route path='/InstructorVideo' element={<InstructorVideo/>}/>
            <Route path='/InstructorAudio' element={<InstructorAudio/>}/>

            <Route path='/Layout1' element={<Layout1/>}/>
            <Route path='/Layout2' element={<Layout2/>}/>
            <Route path='/LayoutFilter' element={<LayoutFilter/>}/>
           
            <Route path='/AIMusic' element={<AIMusic/>}/>

            <Route path='/Documents' element={<Documents/>}/>
            <Route path='/LiveSessions' element={<LiveSessions/>}/>
            <Route path='/GetLiveSessions' element={<GetLiveSessions/>}/>
            <Route path='/DisplayAll' element={<DisplayAll/>}/>
            <Route path='/VideoAlbum' element={<VideoAlbum/>}/>
            <Route path='/LiveEvents' element={<LiveEvents/>}/>
            <Route path='/Billing' element={<Billing/>}/>
            <Route path='/FeedBackForm' element={<FeedBackForm/>}/>
            <Route path='/Layout3' element={<Layout3/>}/>
            <Route path='/AlbumLayout' element={<AlbumLayout/>}/>

            </Route>
          </Route>
        </Routes>
        </React.Suspense>
      </HashRouter>
     </React.Fragment>
   </div>
  );
}

export default App;
