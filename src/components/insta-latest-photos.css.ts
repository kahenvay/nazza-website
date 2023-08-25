import { style } from "@vanilla-extract/css"
import { media } from "./ui.css"

export const instaList = style({
    
    // display: "grid",
    // gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
    // gridGap: "0rem",
    listStyle: "none",
    display:'flex',
    flexWrap:'wrap',
    padding: "0",
    boxShadow: "0px 0px 25px rgba(0,0,0,0.3)",
    // width: '80%', ->
    margin: 'auto',

  })

    export const instaListItem = style({
        position:'relative',
        width:'100%',
        "@media": {
            
            [media.small]: { 
                width:'50%',
            },
            [media.medium]: { 
                width:'25%',
            },
        }
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
            background:"rgba(0,0,0,0.5)",
            zIndex:1,
        },
        '&:after':{
            position: "absolute",
            content:'',
            ...absFill(),
            opacity:0,
            transition: "opacity 0.3s ease-in-out",
            backgroundImage: 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>\')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            zIndex:1,
        },
        '&:hover:before':{
            opacity:1
        },
        '&:hover:after':{
            opacity:1
        }
    }
  })






export const instaImage= style({
    ...absFill(),
    objectFit: "cover",
    position: "absolute",
    
})

export const instaTitle = style({
    color:'#000',
    display:'block',
    textAlign:'center'
})

// export const background= style({
//     ...absFill,
//     opacity:0,
//     transition: "opacity 0.3s ease-in-out",

// })