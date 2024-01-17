export default function FamilyValuesPage() {
  return (
    <main className="max-w-4xl mx-auto mt-5">
      <h1 className="text-3xl font-bold">What are your family values?</h1>
      <form className="p-5">
        <input type="text" placeholder="Value" />
        <button type="submit">Add</button>
      </form>
    </main>
  );
}
