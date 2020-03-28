<ul class="dropdown-menu">
    @foreach($categories as $category)
        <li class="dropdown-submenu">
            @if($category->child != null)
                <a class="test" tabindex="-1" href="{{route('category-products', $category)}}">{{$category->name}}<span class="caret"></span></a>
            @else
                <a href="{{route('category-products', $category)}}">{{$category->name}}</a>
            @endif
            @if($category->child != null)
                @include('show_partial', ['categories' => $category->child])
            @endif
        </li>
    @endforeach
</ul>