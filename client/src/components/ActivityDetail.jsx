export default function ActivityDetails({details}) {
    return (
        <div >
            {
                details.length > 0 ?
                details.map(el => {
                    return (
                        <div key={el.id}>
                            <p  key={el.id}>{el.name}</p>
                            <p>Difficulty {el.difficulty} <br />
                            {el.duration} <br />
                            {el.season}
                            </p>
                        </div>
                    )
                })
               : <h2>No Activities</h2>
            }
        </div>
    );
};