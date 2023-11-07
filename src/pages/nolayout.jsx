
import ops from '@public/ooops.svg'

const NoLayout = () => {

  
  return ( 
   <>
     <div style={
      {textAlign: 'center', marginTop: '150px'}}>
        
      <img
          alt={"oops"}
        src={ops}
        height={80}
        width={80}
        />

      <h1 style={{textAlign: 'center', fontSize: '35px', fontWeight: '600'}}>Нет макета</h1>

      <button style={{textAlign: 'center', fontSize: '35px', marginTop: '30px', textDecoration: 'underline', color: 'blue',}} type="button" >
        Назад
      </button>
    </div>
  </>
   );
}
 
export default NoLayout;