from django.shortcuts import render, render_to_response


def index(request):
    return render_to_response('gallery/index.html')

def main(request):
    return render_to_response('gallery/main.html')

def detail(request, id):
    return render_to_response('gallery/detail%s.html' % (id))