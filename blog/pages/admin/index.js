import AuthCheck from "../../components/AuthCheck";

export default function AdminPostsPage({ }) {
  return (
    <main>
      <AuthCheck>
        Authenticated content placeholder :-)
      </AuthCheck>
    </main>
  );
}