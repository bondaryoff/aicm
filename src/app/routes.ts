import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { ThankYouPage } from "./components/ThankYouPage";
import { AccountPage } from "./components/AccountPage";

export const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/checkout/:planId", Component: CheckoutPage },
  { path: "/thank-you", Component: ThankYouPage },
  { path: "/account", Component: AccountPage },
  { path: "*", Component: LandingPage },
]);
