import type { Metadata } from "next";
import EmmaLanding from "./EmmaLanding";

export const metadata: Metadata = {
  title: "Emma",
  description:
    "Emma handles brand partnerships end-to-end. Message her on iMessage to get started.",
};

export default function EmmaLandingPage() {
  return <EmmaLanding />;
}
