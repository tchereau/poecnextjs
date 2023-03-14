import styles from '@/styles/Array.module.css'
interface ArrayProps {
    tableau: (string|number)[][];
    thead:string[]
  }
  
export default function Array(props:ArrayProps){
    return (
        <table className={styles.center}>
           <thead>
            <tr>
             {props.thead.map((value:string,index:number)=>{
                return <th>{value}</th>
             })}
            </tr>
           </thead>
           <tbody>
             {props.tableau.map((value:(string|number)[], index:number) => {
                 return <tr key={index}>{value.map((value:string|number, index:number)=>{
                           return <td className={styles.td} key={index}>{value}</td>})}
                        </tr>
              })}
           </tbody>
       </table>
      )
}