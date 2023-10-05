const Rules = {
  System: {
    // Trang chủ
    Home: {
      id: 40,
      actions: {
        VIEW: 357
      },
    },

    // dashboad vấn đề

    // thống kê vấn đề
    statistical: {
      id: 41,
      actions: {
        VIEW: 358,
  
      },
    },
     // list danh sách
    list_problem: {
      id: 42,
      actions: {
        VIEW: 359,
LEADING_IDEAS: 365	
  
      },
    },
     

    // quản trị vấn đề
    admin_problem: {
      id: 44,
      actions: {
        VIEW: 361,
        ADD: 362,
        UPDATE: 363,
        DELETE: 364,
  
      },
    },
  },
}

export default Rules
