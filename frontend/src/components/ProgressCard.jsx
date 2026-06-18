function ProgressCard({ xp }) {


    let progress = (xp / 1000) * 100;


    return (

        <div className="card">


            <h2>📈 Progress</h2>


            <h3>
                XP: {xp}
            </h3>


            <div
                style={{
                    background: "#222",
                    height: "12px",
                    borderRadius: "10px"
                }}
            >


                <div

                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "#00f5ff",
                        borderRadius: "10px"
                    }}

                >


                </div>


            </div>


        </div>

    )

}


export default ProgressCard;