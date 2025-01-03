import './styles/HomePage.css'
import Entry from './Entry'
import EntryImages from './EntryImages';
function HomePage(){
    


    return(
        <div className='homepage'>
            <EntryImages></EntryImages>
            <Entry></Entry>
        </div>
    );
}
export default HomePage;