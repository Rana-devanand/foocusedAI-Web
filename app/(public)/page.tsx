import React, { Suspense } from 'react'
import Hero from '@/components/Landing/Hero'
import { WorkedWith } from '@/components/Landing/WorkedWith'
import { TechStack } from '@/components/Landing/TechStack'
import { MobileApps } from '@/components/Landing/MobileApps'
import { WebApplications } from '@/components/Landing/WebApplications'
import { YouTubeContent } from '@/components/Landing/YouTubeContent'
import { MyJourney } from '@/components/Landing/MyJourney'
import { ContactUs } from '@/components/Landing/ContactUs'
import Footer from '@/components/layout/Footer'

const Home = () => {
  return (
    <div className="flex flex-col bg-black text-white">
      <Hero />
      
      <Suspense fallback={<LoadingPlaceholder />}>
         <TechStack />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
         <WorkedWith />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
         <WebApplications />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
         <MobileApps />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
         <YouTubeContent />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
         <ContactUs />
      </Suspense>

    </div>
  )
}

const LoadingPlaceholder = () => (
   <div className="h-96 w-full flex items-center justify-center text-slate-500 animate-pulse">
      Loading content...
   </div>
)

export default Home;
