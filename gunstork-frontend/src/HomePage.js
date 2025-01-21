import './styles/HomePage.css'
import Entry from './Entry'
import EntryImages from './EntryImages';
function HomePage({addProductToCart}){
    


    return(
        <div className='homepage'>
            <EntryImages ></EntryImages>
            <Entry addProductToCart={addProductToCart}></Entry>
        </div>
    );
}
export default HomePage;