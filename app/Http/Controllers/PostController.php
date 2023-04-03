<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\PostRequest;
class PostController extends Controller
{
    public function index(){
        $columns = ['id','titlePost'];
        $posts = Post::all($columns);
        return response()->json($posts);
    }

    public function store(PostRequest $request){
        $post = new Post();
        $post->titlePost = $request->titlePost;
        $post->descriptionPost = $request->descriptionPost;
        $post->save();
        return response()->json(['isGood'=>true]);
    }

    public function show(Post $post, $id){
        $post = Post::find($id);
        return response()->json($post);
    }

    public function update(PostRequest $request, Post $post, $id){
        $post = Post::find($id);
        $post->titlePost = $request->titlePost;
        $post->descriptionPost = $request->descriptionPost;
        $post->save();
        return response()->json(['isGood'=>true]);
    }

    public function destroy(Post $post, $id){
        Post::destroy($id);
        return response()->json(['isGood'=>true]);
    }
}
