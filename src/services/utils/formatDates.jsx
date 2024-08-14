export function formatTimestampToInputDate(timestamp){
    const collator =new Intl.DateTimeFormat("en-CA",{
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
    })

    return collator.format(new Date(timestamp));
}