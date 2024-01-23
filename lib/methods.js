function get_formated_title(item){
    const title = item?.name || item?.title
    console.log(title)
    return title.length > 18 ? title.substring(0, 18) + "..." : title
}

function format_title(title){
    console.log(title)
    return title.length > 18 ? title.substring(0, 18) + "..." : title
}
export {get_formated_title, format_title}