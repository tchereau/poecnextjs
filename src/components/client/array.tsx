import styles from "@/styles/Array.module.css";
interface ArrayProps {
  tableau: (string | number)[][];
  thead: string[];
}

export default function Array(props: ArrayProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {props.thead.map((value: string, index: number) => {
            return <th className={styles.th}>{value}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.tableau.map((value: (string | number)[], index: number) => {
          return (
            <tr key={index}  className={styles.tr}>
              {value.map((value: string | number, index: number) => {
                return (
                  <td className={styles.td} key={index}>
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
