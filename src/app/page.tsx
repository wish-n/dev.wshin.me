import CategoryNavigator from "@/components/CategoryNavigator";

export default function Home() {
  return (
    <div>
      <CategoryNavigator categories={["A", "B", "C"]} />
    </div>
  );
}
