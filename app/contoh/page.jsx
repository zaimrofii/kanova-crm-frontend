import { motion } from "framer-motion";

const Page = () => {
  return (
    <>
      <motion.div drag className="w-64 h-40 bg-blue-500 rounded shadow">
        Geser aku bebas!
      </motion.div>
    </>
  );
};
export default Page;
