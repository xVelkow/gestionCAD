<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Validator;

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
        $post->sessionPost = $request->sessionPost;
        $image = $request->file('imagePost');
        // return response()->json([$request]);
        $imageName = time().'.'.$image->extension();
        $extension = $image->getClientOriginalExtension();
        $filename = time().'.'.$extension;
        $image->move(public_path('images'), $filename);
        $post->imagePost = $filename;
        $post->save();
        return response()->json(['isGood'=>true]);
    }

    public function show(Post $post, $id){
        $post = Post::find($id);
        return response()->json($post);
    }

    public function update(PostRequest $request, Post $post, $id){
        $validator = Validator::make($request->all(), [
            'imagePost' => 'file|image'
        ]);
        $post = Post::find($id);
        $post->titlePost = $request->titlePost;
        $post->descriptionPost = $request->descriptionPost;
        $post->sessionPost = $request->sessionPost;
        if ($validator->passes()) {
            $image = $request->file('imagePost');
            $imageName = time().'.'.$image->extension();
            $extension = $image->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $image->move(public_path('images'), $filename);
            $post->imagePost = $filename;
        }else{
            $post->imagePost = $request->imagePost;
        }
        $post->save();
        return response()->json(['isGood'=>true]);
    }

    public function destroy(Post $post, $id){
        Post::destroy($id);
        return response()->json(['isGood'=>true]);
    }
}
