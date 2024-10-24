import Editor from "../../islands/Editor.tsx";
import { Navigation } from "../../components/Navigation.tsx";
export default function Home() {
  return (
    <div>
      <Navigation />
      <button class="btn btn-primary">Click Me!</button>
      <Editor />
    </div>
  );
}
