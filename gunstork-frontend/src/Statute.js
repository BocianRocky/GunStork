import regulamin from './assets/regulamin.json'
import './styles/Statute.css'

function Statute(){

    const setType = (content) => {
        return content.map((item, index) => {
            
            if (item.type === 'bulletList') {
                return (
                <ul key={index}>
                    {item.items.map((listItem, i) => (
                    <li key={i}>{listItem}</li>
                    ))}
                </ul>
                );
            }
            return <li key={index}>{item}</li>;
        });
        
      };
      

    return(
        <div className='statute-container'>
            <div className='statute-settings'>
                <div className='statute-intro'>
                    <h2>Regulamin</h2>
                </div>
                <div className='statute-text'>
                    <p align='center'><strong>{regulamin.title}</strong></p>
                    <p align='center'><strong>{regulamin.title2}</strong></p>
                    <div className='statute-main'>
                    {
                        regulamin.sections.map((section,index)=>(
                            <div key={index}>
                                <div className='section'>
                                    <p align='center'><strong>{section.title}</strong></p>
                                    <p align='center'><strong>{section.subTitle}</strong></p>
                                    <ol>{setType(section.content)}</ol>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                
            </div>

        </div>
    )
}
export default Statute;