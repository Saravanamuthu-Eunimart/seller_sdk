import e from "cors";

// import temp from "./sdkproducts.js"
class Mappers{
searchMapper(mapper,payload){
    var data=[]
    for(let k=0;k<payload.length;k++){
        const result=JSON.parse(JSON.stringify(mapper));
        data.push(iterateValues(payload[k],result))        
            }
    var obj=data[0]
    for(let i=1;i<data.length;i++){
        obj.bpp_providers.push(data[i].bpp_providers[0])
    }
    return obj
    // return iterateValues(payload,mapper)
}
commonMapper(mapper,payload){
    return iterateValues(payload,mapper)
}
}
// const payload = payload
function iterateValues(payload,mapping){
    for (const key in mapping){
        if(typeof mapping[key]==='object' && !Array.isArray(mapping[key])){
            iterateValues(payload,mapping[key])
        }else if(Array.isArray(mapping[key])){
            mapping[key]=arrayMapping(mapping[key][0],payload)
        }
        else{
            mapping[key]=findValue(mapping[key],payload)
        }
    }
    return mapping
}
function findValue(keyPath,payload){
    const keys = keyPath.split(".");
    let value = payload;
for (const key of keys) {
  value = value[key];
}
return value
}
function arrayMapping(keyPath,payload,index,flag=false){
    var obj=[]
     var i=(index) || 0
    while(true){
        try{
        var temp={}
    for(const items in keyPath){

        if(typeof keyPath[items] ==='object' && !Array.isArray(keyPath[items])){
            var t=arrayMapping(keyPath[items],payload,i)
            if(t.length){
                temp[items]=t[0]
            }
            if(flag){
            return t
            }
            
        }else if(Array.isArray(keyPath[items])){
            var t=arrayMapping(keyPath[items],payload,i,true)
            if(t.length){
            temp[items]=t
            }
        }
        else{
        const keys = keyPath[items].split(".");
        let value = payload;
        for (let ind=0;ind<keys.length;ind++) {

            value = value[keys[ind]];
            if(ind==(keys.length-1)){
                continue
            }
            if(Array.isArray(value)){
                // console.log("--------",keys[ind],value[i])
                value=value[i]
            }
        }
        temp[items]=value
    }
}
    i+=1
    obj.push(temp)
    }catch(err){
        break
    }
}
    return obj

    }
export default Mappers
// console.log(JSON.stringify(iterateValues(payload,jsonMapping)))
