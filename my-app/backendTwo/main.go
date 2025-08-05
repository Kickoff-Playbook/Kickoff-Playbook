package main

import (
	"fmt"
	"net/http"

	"koplaybook.com/backend/database"
	"koplaybook.com/backend/handlers"
)



func main() {
	db := database.Init()
    database.Seed(db)

	
	h := handlers.New(db)

 	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodPost {
            h.CreateUser(w, r)
            return
        }
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    })

	http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodDelete {
            h.DeleteUser(w, r)
            return
        }
        if r.Method == http.MethodPut {
            h.UpdateUser(w, r)
            return
        }
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    })

	http.HandleFunc("/users/login", func(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
        h.LoginUser(w, r)
        return
    }
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
})

	// Posts routes
    http.HandleFunc("/create/post", func(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPost {
        h.CreatePost(w, r)
        return
    }
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
})
http.HandleFunc("/get/post/", func(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodGet {
        h.GetPost(w, r)
        return
    }
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
})
http.HandleFunc("/get/posts", func(w http.ResponseWriter, r *http.Request) {
        if r.Method == http.MethodGet {
            h.GetAllPosts(w, r)
            return
        }
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    })


http.HandleFunc("/update/post/", func(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodPatch {
        h.UpdatePost(w, r)
        return
    }
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
})

http.HandleFunc("/delete/post/", func(w http.ResponseWriter, r *http.Request) {
    if r.Method == http.MethodDelete {
        h.DeletePost(w, r)
        return
    }
    http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
})

	// Comment routes
	http.HandleFunc("/create/comment", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			h.CreateComment(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	http.HandleFunc("/get/comments/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			h.GetCommentsByPost(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	http.HandleFunc("/delete/comment/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodDelete {
			h.DeleteComment(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	// Like routes
	http.HandleFunc("/toggle/like/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			h.ToggleLike(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	http.HandleFunc("/get/likes/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			h.GetLikesByPost(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	// Bookmark routes
	http.HandleFunc("/toggle/bookmark/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			h.ToggleBookmark(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	http.HandleFunc("/get/bookmarks/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			h.GetBookmarksByPost(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	http.HandleFunc("/get/user/bookmarks/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			h.GetUserBookmarks(w, r)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})


	///////////////////////////////////////
    fmt.Println("Server starting on 0.0.0.0:8080...")
    err := http.ListenAndServe("0.0.0.0:8080", nil)
    if err != nil {
        fmt.Println("ERROR! This server can not be used at this time:", err)
    }
}