import { Portfolio } from "@/components/portfolio";
import { getPortfolioData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  return <Portfolio data={data} />;
}
