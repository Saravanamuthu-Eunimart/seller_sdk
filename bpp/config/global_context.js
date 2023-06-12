var context={}
function setContext(data){
    context={
        "domain": data?.domain || context?.domain,
        "country": data?.country || context?.country,
        "city": data?.city || context?.city,
        "action": data?.action || context?.action,
        "core_version": data?.core_version || context?.core_version,
        "bap_id": data?.bap_id || context?.bap_id,
        "bap_uri": data?.bap_uri || context?.bap_uri ,
        "bpp_id": data?.bpp_id || context?.bpp_id,
        "bpp_uri": data?.bpp_uri || context?.bpp_uri,
        "transaction_id": data?.transaction_id || context?.transaction_id,
        "message_id": data?.message_id || context?.message_id,
        "timestamp": data?.timestamp || context?.timestamp,
        "ttl": data?.ttl || context?.ttl
      }
}
function getContext(){
    return context
}
export {getContext,setContext}