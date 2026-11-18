import { useRoute } from "./lib/router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Order } from "./pages/Order";
import { Checkout } from "./pages/Checkout";
import { Confirmation } from "./pages/Confirmation";
import { Kitchen } from "./pages/Kitchen";
import { About } from "./pages/About";

export default function App() {
  const route = useRoute();
  let page;
  if (route === "/" || route === "") page = <Home />;
  else if (route.startsWith("/order")) page = <Order />;
  else if (route === "/checkout") page = <Checkout />;
  else if (route.startsWith("/confirm/")) page = <Confirmation id={route.slice("/confirm/".length)} />;
  else if (route === "/kitchen") page = <Kitchen />;
  else if (route === "/about") page = <About />;
  else page = <Home />;
  return <Layout route={route}>{page}</Layout>;
}
