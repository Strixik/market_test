<div class="row" style="margin-top: 20px">

    <div class="dropdown col-md-6">
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Categories
            <span class="caret"></span></button>

        <ul class="dropdown-menu">
            @foreach($categories as $category)
                <li class="dropdown-submenu">
                    <a class="test" tabindex="-1" href="#">{{$category->name}}<span class="caret"></span></a>
                    @if(is_array($category->child) && count($category->child))
                        @include('show_partial', ['categories' => $category->child])
                    @endif
                </li>
            @endforeach
        </ul>


    </div>
    <div class="dropdown col-md-6">
        <a href="{{ url("src/login") }}" class="btn btn-default  pull-right">Admin</a>
    </div>
</div>