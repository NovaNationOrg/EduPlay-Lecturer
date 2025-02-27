import * as motion from "motion/react-client"

const box = {
    width: "100px",
    height: "100px",
    backgroundColor: "red"
};

export default function Rotate() {
    return (
        <motion.div
            style={box}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
        />
    )
}