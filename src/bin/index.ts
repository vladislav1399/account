import app from "../app";
import {PORT} from "../config/config";
import {connectDB} from "../db/mongo-connect";

connectDB().then( (result: any) => {
    if(result.status) {
        app.listen(PORT, () => {
            console.log('server started')
        })
    } else {
        console.log('Сервер не запущен, ошибка подключения к монге', result)
    }
})



