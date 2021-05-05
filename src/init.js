// -----< Mongo DB 가져오기 >-----
import "./db";


// -----< Video DB 모델 가져오기 >-----
import "./models/Video"


// -----< User DB 모델 가져오기 >-----
import "./models/User"


// -----< 서버에서 app 가져오기 >-----
import app from "./server"


//-----< 외부 request 를 듣게 준비하고 있어라 >-----
const PORT = 4000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT} ⛴`);

app.listen(PORT, handleListening);