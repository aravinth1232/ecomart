
import Search from "./components/Search"
 

export default function Home() {
 
  const items = [
    { name: 'Apple', price: 1.2 },
    { name: 'Banana', price: 0.5 },
    { name: 'Orange', price: 0.8 },
    { name: 'Mango', price: 1.5 },
    { name: 'Pineapple', price: 3.0 }
  ];


  return (
    <>
    <h1>Filter</h1>

    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-center text-2xl font-bold mb-6">Search </h1>
      <Search items={items} />
    </div>

   
    </>
  );
}
