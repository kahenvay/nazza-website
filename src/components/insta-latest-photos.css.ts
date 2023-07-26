import { style } from "@vanilla-extract/css"

export const instaList = style({
    
    display: "grid",
    // gridTemplateColumns: "repeat(4, 1fr)",
    // gap: "10px",
    listStyle: "none",
    // gridAutoRows: "minmax(100px, auto)",

    gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
    gridGap: "1rem",
    padding: "0 4rem",
    

  })

  const absFill = () => {
    return {
        top:0,
        left:0,
        width: "100%",
        height: "100%",
        // position: "absolute",
    }
}

export const instaLink = style({
    position: "relative",
    height: "0",
    display: "block",
    paddingBottom: "100%",
    selectors:{
        '&:before':{
            position: "absolute",
            content:'',
            ...absFill(),
            opacity:0,
            transition: "opacity 0.3s ease-in-out",
            background:"rgba(0,0,0,0.3)",
            zIndex:1,
        },
        '&:hover:before':{
            opacity:1
        }
    }
  })






export const instaImage= style({
    ...absFill(),
    objectFit: "cover",
    position: "absolute",
    
})

// export const background= style({
//     ...absFill,
//     opacity:0,
//     transition: "opacity 0.3s ease-in-out",

// })