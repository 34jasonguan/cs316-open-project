const styles = {
    pageContainer: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F4F6F9',
      justifyContent: 'center',
    },
    header: {
      width: '100%',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
    },
    userID: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      position: 'absolute',
      top: '0',
      right: '0',
      padding: '20px'
    },
    loginLink: {
      fontSize: '16px',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: '#0070f3',
      position: 'absolute',
      top: '0',
      right: '100px',
      padding: '20px'
    },
    registerLink: {
      fontSize: '16px',
      fontWeight: 'bold',
      textDecoration: 'none',
      color: '#0070f3',
      position: 'absolute',
      top: '0',
      right: '0',
      padding: '20px'
    },
    sidebar: {
      width: '220px',
      flexShrink: 0,
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    sidebarHeading: {
      fontSize: '25px',
      fontWeight: '600',
      marginBottom: '20px',
      marginTop: '20px',
      marginLeft: '10px',
    },
    squareLink: {
      width: '100px',
      height: '50px',
      backgroundColor: '#0070f3',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '15px'
    },
    contentArea: {
      padding: '20px',
    },
    heading: {
      fontSize: '30px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    label: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '10px',
      display: 'block',
      marginLeft: '50px',
      marginRight: '50px',
    },
    select: {
      padding: '10px',
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #ccc',
      marginBottom: '20px',
      fontSize: '16px',
    },
    mainArea: {
      display: 'flex',
      flexShrink: 0,
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    taskDescription: {
      flex: '1',
      paddingRight: '100px',
      borderRight: '1px solid #e0e0e0',
      position: 'relative',
    },
    subheading: {
      fontSize: '20px',
      fontWeight: '500',
      marginBottom: '10px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#008000',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      position: 'absolute',
      right: '20px',
      bottom: '10px',
    },
    taskInput: {
      flex: '1',
      paddingLeft: '100px',
      paddingRight: '100px',
    },
    textArea: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
      padding: '10px'
    },
    outputArea: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    output: {
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
      backgroundColor: '#f0f0f0',
      padding: '10px',
      borderRadius: '8px',
    },

    // for icons in the menu
    iconTextLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',  
        textDecoration: 'none',  
        color: '#333', 
        backgroundColor: '#f0f0f0', 
        borderRadius: '8px',  
        transition: 'background-color 0.3s ease, color 0.3s ease',
        flexShrink: 0,
        marginBottom: '20px',
      },
      iconTextLinkHover: {
        backgroundColor: '#0070f3', 
        color: '#fff',  
      },
      icon: {
        width: '50px', 
        height: '50px',
        marginRight: '15px',
        
      },
      text: {
        fontSize: '18px',
        fontWeight: '500',
      },
  };
  
  export default styles;
  