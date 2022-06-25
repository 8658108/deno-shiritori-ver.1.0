import { serve } from "https://deno.land/std@0.138.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";


let previouword = "しりとり";

console.log("Listening on http://localhost:8000");
serve(async (req) => {
    const pathname=new URL(req.url).pathname;
    console.log(pathname);

    if(req.method === "GET" && pathname === "/shiritori"){
        return new Response(previouword);
    }
    if(req.method === "POST" && pathname === "/shiritori"){
        const requestJson=await req.json();
        const nextWord=requestJson.nextWord;
        if(nextWord.length>0 && previouword.charAt(previouword.length-1) !== nextWord.charAt(0)){
            return new Response("前の単語に続いていません。",{ status: 400 });
        }

        previouword=nextWord;
        return new Response(previouword);
    }

    return serveDir(req, {  
        fsRoot: "public",
        urlRoot: "",
        showDirListing: true,
        enableCors: true,
    });

});