import { Agentation } from "agentation"
import { LandingPage } from "@/pages/landing/LandingPage"

export default function App() {
  return (
    <>
      <LandingPage />
      {import.meta.env.DEV && (
        <Agentation
          endpoint="http://localhost:4747"
          onSessionCreated={(sessionId) => {
            console.log("Session started:", sessionId)
          }}
        />
      )}
    </>
  )
}
