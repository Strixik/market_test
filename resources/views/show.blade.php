@extends('layouts.main')
@section('content')
    <h1>{{$category->name}}</h1>
    <hr>
    @if(count($products))
    @foreach($products as $product)
        <p>Name: {{$product->name}}. Price: {{$product->price}}</p>
    @endforeach
    @else
        <p>There are no products in this category.</p>
    @endif

@stop
