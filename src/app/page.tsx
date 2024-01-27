import "./globals.css";
import AddQuestion from "./decision-tree/AddQuestion";
import Questions from "./decision-tree/Questions";
import { IQuestion } from "../../types/questions";
import Link from "next/link";

export default async function Home() {
  const questions = [] as IQuestion[];
  console.log(questions);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <Link href="/decision-tree">Decision Tree</Link>
      <Link href=""></Link>
      {/* <Link></Link>
      <Link></Link>
      <Link></Link>
      <Link></Link> */}
    </main>
  );
}
