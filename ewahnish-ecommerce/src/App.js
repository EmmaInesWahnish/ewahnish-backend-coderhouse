import './App.css';
import ProductContainer from './src/js/Containers/productContainer.js'

function App() {
  let array = [];
  ProductContainer.deleteById(2);
  const product = new ProductContainer("y otro producto ", 655, "una imagen");
  product.save();
  ProductContainer.getAll(array);
  return (
    <div className="App">
      <header className="App-header">
        Emma Ines Wawnish Backend Coder House
      </header>
    </div>
  );
}

export default App;
