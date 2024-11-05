@include('layout.head')

<div class="wrapper">
    @include('layout.header')
    <main class="main pt-6 pb-12">
        @yield('html')
    </main>
</div>

@include('layout.footer')
